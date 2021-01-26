import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showAlert, showFormAlert } from "../../helpers/alerts";
import { sendInvitation } from "../../helpers/syncRequest";
import { animateTestomony } from "../../helpers/ui";
import { startDeleteTestimonial } from "../../redux/actions/testimonial.action";
import CardTestimonial from "../ui/CardTestimonial";
import Title from "../ui/Title";
import SEO from "../ui/SEO";
import "../../styles/testimonials.css";

export const Testimonials = () => {
  // Hooks
  const [count, setCount] = useState(0);
  const [testimony, setTestimony] = useState(null);
  const { testimonials } = useSelector((state) => state.testimonials);
  const { uid } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  useEffect(() => {
    setTestimony(testimonials[count]);
  }, [count, testimonials]);

  // Funciones

  const handleNextTestimony = () => {
    animateTestomony("animate__fadeInLeft");
    count < testimonials.length - 1 ? setCount(count + 1) : setCount(0);
  };

  const handlePreviousTestimony = () => {
    animateTestomony("animate__fadeInRight");
    count > 0 ? setCount(count - 1) : setCount(testimonials.length - 1);
  };

  const handleSendInvitation = async () => {
    const question = await showFormAlert([
      {
        title: "Nombre",
        input: "text",
      },
      {
        title: "Correo",
        input: "email",
      },
    ]);
    if (!question.dismiss) {
      const [name, email] = question.value;
      const { ok, msg } = await sendInvitation({ name, email });
      ok ? showAlert("success", msg) : showAlert("error", msg);
    }
  };

  const handleDeleteTestimonial = async () => {
    const question = window.confirm("¿Está seguro?");
    if (question) {
      await dispatch(startDeleteTestimonial(testimony._id));
      testimonials.length > 0
        ? setTestimony(testimonials[0])
        : setTestimony(null);
    }
  };

  return (
    <>
      <SEO
        title="Testimonios | Alexander.js"
        description="Opiniones de compañeros de profesión y clientes de Alexander Peñaloza"
      />
      <Title title="Testimonios" subtitle="¿Qué piensan de mí?" />
      <div className="testimonials-container">
        <div className="list-testimonials neumorphism">
          {testimony && <CardTestimonial testimony={testimony} />}
        </div>
      </div>
      <div className="list-btn">
        <button
          disabled={testimonials.length < 1}
          onClick={handlePreviousTestimony}
        >
          <i className="fas fa-chevron-left"></i>
        </button>
        <button
          disabled={testimonials.length < 1}
          onClick={handleNextTestimony}
        >
          <i className="fas fa-chevron-right"></i>
        </button>
        {uid && (
          <button onClick={handleSendInvitation}>
            <i className="fas fa-user-plus"></i>
          </button>
        )}
        {uid && testimonials.length > 0 && (
          <button disabled={loading} onClick={handleDeleteTestimonial}>
            {loading ? (
              <i className="fas fa-spinner fa-pulse"></i>
            ) : (
              <i className="fas fa-trash-alt"></i>
            )}
          </button>
        )}
      </div>
    </>
  );
};
