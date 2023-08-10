<script setup lang="ts" name="Pixi">
import { ref, onMounted, unref } from "vue";
import * as PIXI from "pixi.js";
import Matter from "matter-js";

const domRef = ref<HTMLDivElement | undefined>(undefined);

onMounted(async () => {
  // Matter Modules
  const Engine = Matter.Engine;
  const World = Matter.World;
  const Body = Matter.Body;
  const Bodies = Matter.Bodies;
  const Mouse = Matter.Mouse;
  const MouseConstraint = Matter.MouseConstraint;

  // Scene Container
  const sceneContainer = unref(domRef)!;
  const canvasWidth = sceneContainer.offsetWidth;
  const canvasHeight = sceneContainer.offsetHeight;
  let canvasPrevWidth = canvasWidth;
  let canvasPrevHeight = canvasHeight;

  /*--------------------------
  Engine
  ---
  设置物质引擎。 这就是 Matter 机构运行的环境。
  --------------------------*/

  const engine = Engine.create();

  /*--------------------------
  Pixi Data
  --------------------------*/

  const images = [
    {
      src: "https://images.unsplash.com/photo-1480796927426-f609979314bd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80",
      initialPosition: {
        x: 300,
        y: 180,
      },
      width: 200,
      height: 100,
    },
    {
      src: "https://images.unsplash.com/photo-1526312426976-f4d754fa9bd6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80",
      initialPosition: {
        x: 300,
        y: 180,
      },
      width: 200,
      height: 100,
    },
    {
      src: "https://images.unsplash.com/photo-1534214526114-0ea4d47b04f2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80",
      initialPosition: {
        x: 500,
        y: 180,
      },
      width: 200,
      height: 100,
    },
  ];

  /*--------------------------
  Scene Objects
  --------------------------*/

  // 我们希望在场景中跟踪的对象数组。 当我们根据图像创建肢体和精灵时，将填充此数组。
  const sceneObjects: { body: any; sprite: PIXI.Sprite }[] = [];

  /*--------------------------
  Setup Walls
  ---
  墙壁会将我们的身体和精灵控制在一个有限的区域内。
  --------------------------*/

  const wallTop = Bodies.rectangle(canvasWidth / 2, 0, canvasWidth, 10, {
    isStatic: true,
  });
  const wallBottom = Bodies.rectangle(canvasWidth / 2, canvasHeight, canvasWidth, 10, {
    isStatic: true,
  });
  const wallRight = Bodies.rectangle(canvasWidth, canvasHeight / 2, 10, canvasHeight, {
    isStatic: true,
  });
  const wallLeft = Bodies.rectangle(0, canvasHeight / 2, 10, canvasHeight, {
    isStatic: true,
  });

  // 为世界添加物质墙。
  World.add(engine.world, [wallBottom, wallTop, wallLeft, wallRight]);

  /*--------------------------
  Pixi
  --------------------------*/

  // 设置 Pixi 渲染器，使其与 Matter 世界的大小一致。
  const app = new PIXI.Application({
    backgroundAlpha: 0,
    resizeTo: sceneContainer as HTMLElement,
  });

  // 将 Pixi 应用程序画布放入场景容器中。
  sceneContainer.appendChild(app.view as unknown as Node);

  /*--------------------------
  Create Scene Object
  --------------------------*/

  function createSceneObject(image: { src: any; initialPosition: any; width: any; height: any }) {
    // Matter Body
    const imageBody = Bodies.rectangle(image.initialPosition.x, image.initialPosition.y, image.width, image.height, {
      restitution: 0.8,
    });
    World.addBody(engine.world, imageBody);

    // Pixi Sprite
    // 精灵可以是 Pixi api 中的任何内容。 视频、图片、制作成圆形、遮罩等。 您只需确保设置了适当的锚点，将其添加到舞台上，并让它跟随我们的 pixi 应用程序 ticker 中的主体。
    const bunnyTexture = PIXI.Texture.from(image.src);
    const imageSprite = new PIXI.Sprite(bunnyTexture);
    imageSprite.width = image.width;
    imageSprite.height = image.height;
    imageSprite.position;
    imageSprite.anchor.set(0.5, 0.5);
    app.stage.addChild(imageSprite);

    // 将完整的场景对象（主体和精灵）添加到我们的对象数组中。 我们将在 pixi 帧更新中跟踪这些对象（见下文 app.ticker）。
    sceneObjects.push({
      body: imageBody,
      sprite: imageSprite,
    });
  }

  /*--------------------------
  Pixi Frame Updates
  --------------------------*/

  app.ticker.add(() => {
    sceneObjects.forEach(object => {
      // 让所有的 pixi 精灵跟随其身体的位置和旋转。
      object.sprite.position = object.body.position;
      object.sprite.rotation = object.body.angle;
    });
  });

  /*--------------------------
  Mouse Control
  ---
  将鼠标添加到 Pixi 框架中。 这样就能实现与物体的互动。 我们没有使用 Matter 渲染器，因此需要将鼠标连接到运行在 Pixi 世界之上的隐形 Matter 引擎。
  --------------------------*/

  const mouseConstraint = MouseConstraint.create(engine, {
    mouse: Mouse.create(document.querySelector(".page canvas")),
  });

  World.add(engine.world, mouseConstraint);

  /*--------------------------
  Window Resize
  ---
  确保即使在调整浏览器大小的情况下，对象仍与容器壁保持一致。
  --------------------------*/

  window.addEventListener("resize", function () {
    // 保存新的画布宽度
    const canvasWidth = sceneContainer.offsetWidth;
    const canvasHeight = sceneContainer.offsetHeight;

    // 重新定位所有墙壁，并按比例调整它们的宽度/高度。
    Body.setPosition(wallLeft, {
      x: 0,
      y: canvasHeight / 2,
    });
    Body.scale(wallLeft, 1, canvasHeight / canvasPrevHeight);

    Body.setPosition(wallRight, {
      x: canvasWidth,
      y: canvasHeight / 2,
    });
    Body.scale(wallRight, 1, canvasHeight / canvasPrevHeight);

    Body.setPosition(wallTop, {
      x: canvasWidth / 2,
      y: 0,
    });
    Body.scale(wallTop, canvasWidth / canvasPrevWidth, 1);

    Body.setPosition(wallBottom, {
      x: canvasWidth / 2,
      y: canvasHeight,
    });
    Body.scale(wallBottom, canvasWidth / canvasPrevWidth, 1);

    // 将新的画布尺寸设置为之前的尺寸。 这样我们才能正确缩放环境。
    canvasPrevWidth = canvasWidth;
    canvasPrevHeight = canvasHeight;
  });

  /*--------------------------
  Run
  ---
  在这里，我们创建初始对象并启动引擎。
  --------------------------*/

  // Create the bodies and sprites.
  images.forEach(image => {
    createSceneObject(image);
  });

  //运行 Matter 引擎。 这将持续更新 Matter.Engine。 这将确保我们能在每次 tick 时监听更新，并通过 Matter 主体移动 Pixi 对象（请参阅 app.ticker 函数）。
  Matter.Runner.run(engine);
});
</script>

<template>
  <div class="page" ref="domRef"></div>
</template>

<style scoped lang="scss"></style>
