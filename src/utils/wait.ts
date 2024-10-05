export function wait(durationSeconds = 2) {
  return new Promise((resolve) => {
    setTimeout(resolve, durationSeconds * 1000);
  });
}
