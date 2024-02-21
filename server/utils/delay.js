async function delay(timeout = 1500) {
  const randomTimeout = Math.round(Math.random() * timeout);
  return await new Promise((resolve) => setTimeout(resolve, randomTimeout));
}

export default delay;
