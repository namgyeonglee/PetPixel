import React, { useEffect } from "react";
import confetti from "canvas-confetti";

interface EnhancedCanvasConfettiProps {
  show: boolean;
  duration?: number;
  style?: "raycast" | "celebration" | "burst";
}

const EnhancedCanvasConfetti: React.FC<EnhancedCanvasConfettiProps> = ({
  show,
  duration = 3000,
  style = "raycast",
}) => {
  useEffect(() => {
    if (!show) return;

    // 프로젝트 색상 팔레트
    const colors = [
      "#d2d2ff",
      "#9d9dff",
      "#7070ff",
      "#4242ff",
      "#f8f8ff",
      "#ffd93d",
      "#ff6b9d",
    ];

    if (style === "raycast") {
      // Raycast 스타일: 정말 끝자락에서 빵파레처럼 터지기
      const end = Date.now() + duration / 4;

      const frame = () => {
        // 완전 왼쪽 끝에서 빵파레 (세모 + 네모)
        confetti({
          particleCount: 20,
          angle: 70,
          spread: 100,
          origin: { x: 0, y: 1 },
          colors: colors,
          gravity: 1,
          startVelocity: 70,
          ticks: 200,
          drift: 0.3,
          scalar: 1.4,
          shapes: ["square", "triangle"], // 네모와 세모!
          flat: false, // 3D 효과
        });

        // 완전 오른쪽 끝에서 빵파레 (세모 + 네모)
        confetti({
          particleCount: 20,
          angle: 110,
          spread: 100,
          origin: { x: 1, y: 1 },
          colors: colors,
          gravity: 1,
          startVelocity: 70,
          ticks: 200,
          drift: -0.3,
          scalar: 1.4,
          shapes: ["square", "triangle"], // 네모와 세모!
          flat: false, // 3D 효과
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };

      frame();
    } else if (style === "celebration") {
      // 축하 스타일: 중앙에서 폭발
      const shoot = () => {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: colors,
          gravity: 0.8,
          shapes: ["square", "circle"],
        });
      };

      shoot();
      setTimeout(shoot, 100);
      setTimeout(shoot, 200);
    } else if (style === "burst") {
      // 버스트 스타일: 여러 방향에서
      const count = 200;
      const defaults = {
        origin: { y: 0.7 },
        colors: colors,
      };

      function fire(particleRatio: number, opts: any) {
        confetti({
          ...defaults,
          ...opts,
          particleCount: Math.floor(count * particleRatio),
        });
      }

      fire(0.25, {
        spread: 26,
        startVelocity: 55,
      });

      fire(0.2, {
        spread: 60,
      });

      fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8,
      });

      fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2,
      });

      fire(0.1, {
        spread: 120,
        startVelocity: 45,
      });
    }
  }, [show, duration, style]);

  return null;
};

export default EnhancedCanvasConfetti;
