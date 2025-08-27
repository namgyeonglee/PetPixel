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
      // Raycast 스타일: 양쪽 사이드 캐논
      const end = Date.now() + duration / 3; // 전체 시간의 1/3만 뿌림

      const frame = () => {
        // 왼쪽 대포
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 35, // 덜 퍼짐 (기본값: 55)
          origin: { x: 0 },
          colors: colors,
          gravity: 2, // 빨리 떨어짐 (기본값: 1)
          startVelocity: 25, // 덜 날아감 (기본값: 45)
          ticks: 120, // 빨리 사라짐 (기본값: 200)
          drift: 0.1, // 덜 흘러감
        });

        // 오른쪽 대포
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 35, // 덜 퍼짐 (기본값: 55)
          origin: { x: 1 },
          colors: colors,
          gravity: 2, // 빨리 떨어짐 (기본값: 1)
          startVelocity: 25, // 덜 날아감 (기본값: 45)
          ticks: 120, // 빨리 사라짐 (기본값: 200)
          drift: -0.1, // 덜 흘러감
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
