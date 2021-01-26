import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useInView } from "react-intersection-observer";
import { showFormAlert } from "../../helpers/alerts";
import {
  startCreateFilter,
  startLoadApps,
  resetApps,
} from "../../redux/actions/app.actions";
import CardApp from "../ui/CardApp";
import Title from "../ui/Title";
import SEO from "../ui/SEO";
import "../../styles/portfolio.css";

export const Portfolio = () => {
  // Hooks
  const dispatch = useDispatch();
  const { filters, apps, totalPages, currentPage } = useSelector(
    (state) => state.apps
  );
  const { uid } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.ui);
  const [page, setPage] = useState(currentPage);
  const [category, setCategory] = useState("todos");

  const { ref, inView } = useInView({
    rootMargin: "1px",
  });

  useEffect(() => {
    dispatch(startLoadApps());
  }, [dispatch]);

  useEffect(() => {
    const nextPage = () =>
      inView && setPage((p) => (p <= totalPages ? p + 1 : p));
    nextPage();
  }, [inView, totalPages]);

  useEffect(() => {
    const refresh = () =>
      page > 1 && dispatch(startLoadApps("refresh", category, page));
    refresh();
  }, [page, category, dispatch]);

  // Funciones

  const handleCreateFilter = async () => {
    const question = await showFormAlert([
      {
        title: "Nombre",
        input: "text",
      },
      {
        title: "Descripción",
        input: "text",
      },
    ]);
    if (!question.dismiss) {
      const [name, description] = question.value;
      dispatch(startCreateFilter({ name, description }));
    }
  };

  const filterByCategory = (category) => {
    setPage(1);
    dispatch(resetApps());
    setCategory(category);
    dispatch(startLoadApps("refresh", category));
  };

  return (
    <>
      <SEO
        title="Portafolio | Alexander.js"
        description="Aplicaciones creadas por Alexander Peñaloza"
      />
      <Title title="Portafolio" subtitle="Mis Proyectos" />
      <div className="portfolio-container">
        <div className="list-filter animate__animated animate__bounceIn">
          {uid && (
            <button onClick={handleCreateFilter} className="item-filter">
              <i className="fas fa-plus"></i>
            </button>
          )}
          <button
            onClick={() => filterByCategory("todos")}
            className="item-filter"
          >
            Todos
          </button>
          {filters.map((filter) => (
            <button
              key={filter._id}
              title={filter.description}
              className="item-filter"
              onClick={() => filterByCategory(filter._id)}
            >
              {filter.name}
            </button>
          ))}
        </div>
        <div className="list-apps">
          {apps.map((app, i) => (
            <CardApp key={`${app._id}${i}`} app={app} />
          ))}
        </div>
        {!loading ? (
          <div ref={ref}></div>
        ) : (
          <div className="loading">
            Cargando <i className="fas fa-spinner fa-pulse"></i>
          </div>
        )}
      </div>
    </>
  );
};
