/**
 * Normalize the position of a target element so that it won't get out of bounds of the scope
 * @param mouse - mouseX and mouseY
 * @param target - target element that want to have it's position normalized
 * @param scope - the area to fit in
 */
export function normalizePozition(
  mouse: { x: number; y: number },
  target: HTMLElement,
  scope: HTMLElement
): { normalizedX: number; normalizedY: number } {
  const { x: mouseX, y: mouseY } = mouse;

  // compute what is the mouse position relative to the container element (scope)
  const { left: scopeOffsetX, top: scopeOffsetY } =
    scope.getBoundingClientRect();

  const scopeX: number = mouseX - scopeOffsetX;
  const scopeY: number = mouseY - scopeOffsetY;

  // check if the element will go out of bounds relative to the scope
  const outOfBoundsOnScopeX: boolean =
    scopeX + target.clientWidth > scope.clientWidth;
  const outOfBoundsOnScopeY: boolean =
    scopeY + target.clientHeight > scope.clientHeight;

  // Get viewport dimensions
  const viewportWidth: number = window.innerWidth;
  const viewportHeight: number = window.innerHeight;

  // Check if the element will go out of bounds relative to the viewport
  const outOfBoundsOnScreenX: boolean =
    mouseX + target.clientWidth > viewportWidth;
  const outOfBoundsOnScreenY: boolean =
    mouseY + target.clientHeight > viewportHeight;

  let normalizedX: number = mouseX;
  let normalizedY: number = mouseY;

  // normalzie on X
  if (outOfBoundsOnScopeX) {
    normalizedX = scopeOffsetX + scope.clientWidth - target.clientWidth;
  }
  if (outOfBoundsOnScreenX) {
    normalizedX = viewportWidth - target.clientWidth;
  }

  // normalize on Y
  if (outOfBoundsOnScopeY) {
    normalizedY = scopeOffsetY + scope.clientHeight - target.clientHeight;
  }
  if (outOfBoundsOnScreenY) {
    normalizedY = viewportHeight - target.clientHeight;
  }

  return { normalizedX, normalizedY };
}
