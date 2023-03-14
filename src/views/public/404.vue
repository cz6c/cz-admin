<template>
  <div class="wscn-http404-container">
    <div class="wscn-http404">
      <div class="pic-404">
        <img class="pic-404__parent" src="@/assets/images/404_images/404.png" alt="404" />
        <img class="pic-404__child left" src="@/assets/images/404_images/404_cloud.png" alt="404" />
        <img class="pic-404__child mid" src="@/assets/images/404_images/404_cloud.png" alt="404" />
        <img class="pic-404__child right" src="@/assets/images/404_images/404_cloud.png" alt="404" />
      </div>
      <div class="bullshit">
        <div class="bullshit__oops">抱歉!</div>
        <div class="bullshit__headline">找不到页面或无权访问...</div>
        <!-- <div class="bullshit__info">Please check that the URL you entered is correct, or click the button below to return to the homepage.</div> -->
        <a href class="bullshit__return-home" style="margin-top: 20px">回到首页</a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="PAGE_NOT_FOUND_NAME"></script>

<style lang="scss" scoped>
.wscn-http404-container {
  height: 100%;
}

.bullshit__return-home {
  text-decoration: none;
}

.wscn-http404 {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  padding: 0 50px;
  width: 1200px;
  height: 100%;

  .pic-404 {
    position: relative;
    float: left;
    overflow: hidden;
    width: 600px;

    &__parent {
      width: 100%;
    }

    &__child {
      @keyframes cloudLeft {
        0% {
          top: 17px;
          left: 220px;
          opacity: 0;
        }

        20% {
          top: 33px;
          left: 188px;
          opacity: 1;
        }

        80% {
          top: 81px;
          left: 92px;
          opacity: 1;
        }

        100% {
          top: 97px;
          left: 60px;
          opacity: 0;
        }
      }
      @keyframes cloudMid {
        0% {
          top: 10px;
          left: 420px;
          opacity: 0;
        }

        20% {
          top: 40px;
          left: 360px;
          opacity: 1;
        }

        70% {
          top: 130px;
          left: 180px;
          opacity: 1;
        }

        100% {
          top: 160px;
          left: 120px;
          opacity: 0;
        }
      }
      @keyframes cloudRight {
        0% {
          top: 100px;
          left: 500px;
          opacity: 0;
        }

        20% {
          top: 120px;
          left: 460px;
          opacity: 1;
        }

        80% {
          top: 180px;
          left: 340px;
          opacity: 1;
        }

        100% {
          top: 200px;
          left: 300px;
          opacity: 0;
        }
      }

      position: absolute;

      &.left {
        top: 17px;
        left: 220px;
        width: 80px;
        opacity: 0;
        animation-name: cloudLeft;
        animation-duration: 2s;
        animation-timing-function: linear;
        animation-fill-mode: forwards;
        animation-delay: 1s;
      }

      &.mid {
        top: 10px;
        left: 420px;
        width: 46px;
        opacity: 0;
        animation-name: cloudMid;
        animation-duration: 2s;
        animation-timing-function: linear;
        animation-fill-mode: forwards;
        animation-delay: 1.2s;
      }

      &.right {
        top: 100px;
        left: 500px;
        width: 62px;
        opacity: 0;
        animation-name: cloudRight;
        animation-duration: 2s;
        animation-timing-function: linear;
        animation-fill-mode: forwards;
        animation-delay: 1s;
      }
    }
  }

  .bullshit {
    @keyframes slideUp {
      0% {
        transform: translateY(60px);
        opacity: 0;
      }

      100% {
        transform: translateY(0);
        opacity: 1;
      }
    }

    position: relative;
    float: left;
    overflow: hidden;
    padding: 30px 0;
    width: 300px;

    &__oops {
      margin-bottom: 20px;
      font-size: 32px;
      font-weight: bold;
      color: #1482f0;
      opacity: 0;
      line-height: 40px;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-fill-mode: forwards;
    }

    &__headline {
      margin-bottom: 10px;
      font-size: 20px;
      font-weight: bold;
      color: #222;
      opacity: 0;
      line-height: 24px;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-delay: 0.1s;
      animation-fill-mode: forwards;
    }

    &__info {
      margin-bottom: 30px;
      font-size: 13px;
      color: grey;
      opacity: 0;
      line-height: 21px;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-delay: 0.2s;
      animation-fill-mode: forwards;
    }

    &__return-home {
      display: block;
      float: left;
      border-radius: 100px;
      width: 110px;
      height: 36px;
      font-size: 14px;
      text-align: center;
      color: #fff;
      background: #1482f0;
      opacity: 0;
      line-height: 36px;
      cursor: pointer;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-delay: 0.3s;
      animation-fill-mode: forwards;
    }
  }
}
</style>
