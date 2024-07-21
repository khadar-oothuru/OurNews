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
          `https://newsapi.org/v2/everything?q=farmers+milk&language=en&apiKey=${apiKey}`,
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
        <span className="loading loading-spinner text-5xl text-info ml-[640px] mb-[200]"></span>
      ) : newsData.length > 0 ? (
        newsData.map((data, index) => <Card key={index} {...data} />)
      ) : (
        <p className="text-6xl text-red-600 text-center ml-[250px]">
          No news data available!
        </p>
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

  // Default image URL if no image is available
  const defaultImage = "https://via.placeholder.com/420x240?text=No+Image";

  // Slice description to a maximum of 100 characters
  const shortDescription = description
    ? description.length > 100
      ? `${description.substring(0, 100)}...`
      : description
    : "";

  return (
    <motion.div
      ref={ref}
      initial={{ x: 100, opacity: 0 }}
      animate={inView ? { x: 0, opacity: 1 } : "hidden"}
      transition={{ ease: "easeInOut", duration: 0.9, delay: 0.0 }}
      className={classes.card_cont}
    >
      <img
        src={urlToImage || defaultImage}
        alt={title}
        className={classes.card_img}
      />
      <h1 className={classes.que}>{title}</h1>
      <p className={classes.ans}>{shortDescription}</p>
      <button className={classes.btn_learn} onClick={openUrlInNewTab}>
        Learn More
      </button>
    </motion.div>
  );
};

export default Cards;
