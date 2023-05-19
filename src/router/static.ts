export async function getStaticRoutes() {
  try {
    const files = (import.meta as any).glob("./modules/*.ts", { import: "default", eager: true });
    // 菜单顺序
    const sortFile = ["dashboard", "system", "components"];
    const routes = [];
    for (const key in files) {
      const fileName = key.replace(/(\.\/modules\/|\.ts)/g, "");
      const index = sortFile.indexOf(fileName);
      if (index !== -1) {
        routes[index] = files[key];
      }
    }
    return routes;
  } catch (error) {
    console.log(error);
    return [];
  }
}
