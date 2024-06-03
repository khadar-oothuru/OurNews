import Cards from "./Cards";
import classes from "./Styles/Ques.module.css";

const QuesCards = () => {
  return (
    <div className={classes.whole_cont}>
      <div className={classes.top_cont}>
        <h3> Our news </h3>
        <h1>
          Our Latest News <br /> That Can Help You
        </h1>

        <p>
          Explore insightful articles that can enrich your knowledge and <br />
          keep you informed about the latest happenings.
        </p>
      </div>
      <div className={classes.bottom_cont}>
        <Cards />
      </div>
    </div>
  );
};

export default QuesCards;
