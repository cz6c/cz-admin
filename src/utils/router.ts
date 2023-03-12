import type { Router, RouteRecordNormalized, RouteRecordRaw, RouteLocationNormalized } from "vue-router";
import { createRouter, createWebHashHistory } from "vue-router";
import { Layout } from "@/router/index";
import { cloneDeep, omit } from "lodash-es";

const modulesRoutes = (import.meta as any).glob("/src/views/**/*.{vue,tsx}");
const modulesRoutesKeys = Object.keys(modulesRoutes);

/**
 * @description: 动态菜单转路由
 * @param {any} routeList
 */
export function transformRoute(routeList: any) {
  routeList.forEach((item: any) => {
    const { component, children } = item;
    if (component === "Layout") {
      item.component = Layout;
      if (children.length) {
        item.redirect = children[0].path;
      }
    } else {
      const index = modulesRoutesKeys.findIndex(x => x.includes((component as string).replace(/@[\/]?views\//, "")));
      console.log(index);
      item.component = modulesRoutes[modulesRoutesKeys[index]];
    }
    children && transformRoute(children);
  });
}

/**
 * @description: 将多级路由转换为 2 级路由
 * @param {RouteRecordRaw} routeModules
 * @return {*}
 */
export function flatMultiLevelRoutes(routeModules: RouteRecordRaw[]): RouteRecordRaw[] {
  const modules: RouteRecordRaw[] = cloneDeep(routeModules);
  for (let index = 0; index < modules.length; index++) {
    const routeModule = modules[index];
    // 判断级别是否多级路由
    if (!isMultipleRoute(routeModule)) {
      // 声明终止当前循环， 即跳过此次循环，进行下一轮
      continue;
    }
    // 路由等级提升
    promoteRouteLevel(routeModule);
  }
  return modules;
}

/**
 * @description: 路由等级提升
 * @param {RouteRecordRaw} routeModule
 */
function promoteRouteLevel(routeModule: RouteRecordRaw) {
  // 使用vue-router拼接菜单
  // createRouter 创建一个可以被 Vue 应用程序使用的路由实例
  let router: Router | null = createRouter({
    routes: [routeModule as unknown as RouteRecordNormalized],
    history: createWebHashHistory(),
  });
  // getRoutes： 获取所有 路由记录的完整列表。
  const routes = router.getRoutes();
  // 将所有子路由添加到二级路由
  addToChildren(routes, routeModule.children || [], routeModule);
  router = null;
  // omit lodash的函数 对传入的item对象的children进行删除
  routeModule.children = routeModule.children?.map(item => omit(item, "children")) as RouteRecordRaw[];
}

/**
 * @description: 将所有子路由添加到二级路由
 * @param {RouteRecordNormalized} routes
 * @param {RouteRecordRaw} children
 * @param {RouteRecordRaw} routeModule
 */
function addToChildren(routes: RouteRecordNormalized[], children: RouteRecordRaw[], routeModule: RouteRecordRaw) {
  for (let index = 0; index < children.length; index++) {
    const child = children[index];
    const route = routes.find(item => item.name === child.name);
    if (!route) {
      continue;
    }
    routeModule.children = routeModule.children || [];
    if (!routeModule.children.find(item => item.name === route.name)) {
      routeModule.children?.push(route as unknown as RouteRecordRaw);
    }
    if (child.children?.length) {
      addToChildren(routes, child.children, routeModule);
    }
  }
}

/**
 * @description: 判断级别是否超过2级
 * @param {RouteRecordRaw} routeModule
 * @return {*}
 */
function isMultipleRoute(routeModule: RouteRecordRaw): boolean {
  // Reflect.has 与 in 操作符 相同, 用于检查一个对象(包括它原型链上)是否拥有某个属性
  if (!routeModule || !Reflect.has(routeModule, "children") || !routeModule.children?.length) {
    return false;
  }
  const children = routeModule.children;
  let flag = false;
  for (let index = 0; index < children.length; index++) {
    const child = children[index];
    if (child.children?.length) {
      flag = true;
      break;
    }
  }
  return flag;
}

/**
 * @description: 查找对应path的路由信息
 * @param {string} path
 * @param {RouteRecordRaw} routes
 * @return {*}
 */
export function findRouteByPath(path: string, routes: RouteRecordRaw[]): RouteRecordRaw | undefined {
  let res = routes.find((item: { path: string }) => item.path == path);
  if (res) {
    return res;
  } else {
    for (let i = 0; i < routes.length; i++) {
      const children: RouteRecordRaw[] = routes[i].children || [];
      if (children.length > 0) {
        res = findRouteByPath(path, children);
        if (res) {
          return res;
        }
      }
    }
    return undefined;
  }
}
