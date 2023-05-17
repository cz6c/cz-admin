const modules = (import.meta as any).glob("/src/router/modules/*.ts");

const routeModules = Object.keys(modules).reduce((pre, key) => {
  pre.push(modules[key]());
  return pre;
}, [] as any[]);

export async function getStaticRoutes() {
  try {
    const res = await Promise.all(routeModules);
    const routeArr: any = res.map(x => x.default);
    return routeArr;
  } catch (error) {
    console.log(error);
    return [];
  }
}
