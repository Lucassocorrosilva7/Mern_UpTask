export const format = (date) => {
  const newDate = new Date(date);

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return newDate.toLocaleDateString("pt-BR", options);
};
