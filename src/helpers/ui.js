const animateTestomony = (className) => {
  const testimony = document.getElementsByClassName("testimony")[0];
  testimony.classList.add(className);
  setTimeout(() => {
    testimony.classList.remove(className);
  }, 500);
};

const scrollUp = () =>
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });

const checkScroll = (callback) =>
  (window.onscroll = () => callback(document.documentElement.scrollTop > 20));

const shortcutKey = (callback) =>
  document.addEventListener("keydown", (e) =>
    callback(e.ctrlKey && e.shiftKey && e.key === "ArrowUp")
  );

const changeViewInAbout = (view) => {
  const values = { skills: false, experience: false, education: false };
  switch (view) {
    case "experience":
      return { ...values, experience: true };
    case "education":
      return { ...values, education: true };
    default:
      return { ...values, skills: true };
  }
};

// Closure
const createAnimation = (listWords = [], cursor, text) => {
  let chartIndex = 0,
    i = 0;
  const printWord = () => {
    if (chartIndex <= listWords[i].length) {
      cursor.classList.add("typed");
      text.textContent += listWords[i].charAt(chartIndex);
      chartIndex++;
      setTimeout(() => {
        printWord();
      }, 100);
    } else {
      cursor.classList.remove("typed");
      setTimeout(() => {
        eraseWord();
      }, 2000);
    }
  };

  const eraseWord = () => {
    if (chartIndex >= 0) {
      cursor.classList.add("typed");
      text.textContent = listWords[i].substring(0, chartIndex);
      chartIndex--;
      setTimeout(() => eraseWord(), 100);
    } else {
      i = i < listWords.length - 1 ? i + 1 : 0;
      cursor.classList.remove("typed");
      setTimeout(() => printWord(), 2000);
    }
  };
  return () => printWord();
};

const startAnimationCursorHome = (services = []) => {
  const cursor = document.querySelector(".cursor");
  const text = document.querySelector(".profession");
  return cursor && text ? createAnimation(services, cursor, text) : null;
};

export {
  animateTestomony,
  startAnimationCursorHome,
  scrollUp,
  checkScroll,
  changeViewInAbout,
  shortcutKey,
};
