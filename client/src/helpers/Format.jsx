export const format = (date) => {
  const newDate = new Date(date.split('T')[0].split('-'));

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
    return newDate.toLocaleDateString("pt-BR", options);
};
