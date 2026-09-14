import type { PerspectiveCamera } from 'three';

const SETTLE_RADIANS = 1e-5;

// Input changes a bounded orientation target; the caller owns the render loop.
export function createFocusCamera(camera: PerspectiveCamera) {
  let radius = camera.position.length();
  const initialYaw = Math.atan2(camera.position.x, camera.position.z);
  const initialPitch = Math.asin(Math.max(-1, Math.min(1, camera.position.y / radius)));
  let yaw = initialYaw, pitch = initialPitch;
  let targetYaw = yaw, targetPitch = pitch, dragging = false;

  function apply() {
    const horizontalRadius = Math.cos(pitch) * radius;
    camera.position.set(Math.sin(yaw) * horizontalRadius, Math.sin(pitch) * radius, Math.cos(yaw) * horizontalRadius);
    camera.lookAt(0, 0, 0);
  }

  return {
    turn(horizontal: number, vertical = 0) {
      if (!Number.isFinite(horizontal) || !Number.isFinite(vertical)) return;
      targetYaw = Math.max(-.35, Math.min(.35, targetYaw + horizontal));
      targetPitch = Math.max(initialPitch - .28, Math.min(initialPitch + .28, targetPitch + vertical));
    },
    // True means this step changed the camera, including its final snap to rest.
    step(deltaSeconds: number) {
      if (!Number.isFinite(deltaSeconds) || deltaSeconds <= 0 || (yaw === targetYaw && pitch === targetPitch)) return false;
      const follow = 1 - Math.exp(-(dragging ? 16 : 9) * deltaSeconds);
      let nextYaw = yaw + (targetYaw - yaw) * follow;
      let nextPitch = pitch + (targetPitch - pitch) * follow;
      if (Math.abs(targetYaw - nextYaw) <= SETTLE_RADIANS) nextYaw = targetYaw;
      if (Math.abs(targetPitch - nextPitch) <= SETTLE_RADIANS) nextPitch = targetPitch;
      if (nextYaw === yaw && nextPitch === pitch) return false;
      yaw = nextYaw; pitch = nextPitch;
      apply();
      return true;
    },
    resize(nextRadius: number) {
      if (!Number.isFinite(nextRadius) || nextRadius <= 0) return;
      radius = nextRadius;
      apply();
    },
    setDragging(value: boolean) { dragging = value; },
    stop() { targetYaw = yaw; targetPitch = pitch; dragging = false; },
  };
}
