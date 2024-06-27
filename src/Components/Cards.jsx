/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import toast from "react-hot-toast";
import classes from "./Styles/Ques.module.css";

const Cards = () => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiKey = "8fbff4d924f245c38e8cd16eaf6a2264";
        const response = await fetch(
          `https://newsapi.org/v2/top-headlines?country=in&apiKey=${apiKey}&category=business`,
          {
            headers: {
              Accept: "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.articles) {
          setNewsData(data.articles);
        } else {
          throw new Error("No news found in response");
        }
      } catch (error) {
        toast.error("Error fetching news data");
        console.error("Error fetching news data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={classes.cards_cont}>
      {loading ? (
        <span className="loading loading-spinner text-5xl text-info ml-[640px] mb-[200px]"></span>
      ) : newsData.length > 0 ? (
        newsData.map((data, index) => <Card key={index} {...data} />)
      ) : (
        <>
          {" "}
          {/* <p className="text-6xl text-red-600 text-center ml-5">
            No news data available.
          </p> */}
          <div role="alert" className="alert alert-error">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span> No news data available.</span>
          </div>
        </>
      )}
    </div>
  );
};

const Card = ({ urlToImage, url, title, description }) => {
  const openUrlInNewTab = () => {
    if (url) {
      window.open(url, "_blank");
    } else {
      console.error("URL is not available");
    }
  };

  const [ref, inView] = useInView({
    triggerOnce: true,
  });

  return (
    urlToImage && (
      <motion.div
        ref={ref}
        initial={{ x: 100, opacity: 0 }}
        animate={inView ? { x: 0, opacity: 1 } : "hidden"}
        transition={{ ease: "easeInOut", duration: 0.9, delay: 0.0 }}
        className={classes.card_cont}
      >
        <img src={urlToImage} alt={title} />
        <h1 className={classes.que}>{title}</h1>
        <p className={classes.ans}>{description}</p>
        <button className={classes.btn_learn} onClick={openUrlInNewTab}>
          Learn More
        </button>
      </motion.div>
    )
  );
};

export default Cards;
