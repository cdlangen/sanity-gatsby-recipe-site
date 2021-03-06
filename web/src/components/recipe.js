import React from "react";
import { buildImageObj } from "../lib/helpers";
import { imageUrlFor } from "../lib/image-url";
import PortableText from "./portableText";
import Container from "./container";
import RecipeMetric from "./recipe-metric";
import { GiCookingPot, GiForkKnifeSpoon } from "react-icons/gi";
import { RiKnifeFill } from "react-icons/ri";

import styles from "./recipe.module.css";

function Recipe(props) {
  const {
    _rawExcerpt,
    title,
    mainImage,
    recipeIngredients,
    recipeInstructions,
    recipeNotes,
  } = props;
  return (
    <article className={styles.root}>
      <div className={styles.recipeSummary}>
        {mainImage && mainImage.asset && (
          <div className={styles.mainImage}>
            <img
              src={imageUrlFor(buildImageObj(mainImage))
                .width(1200)
                .height(Math.floor((9 / 16) * 1200))
                .fit("crop")
                .auto("format")
                .url()}
              alt={mainImage.alt}
            />
          </div>
        )}
        <div className={styles.recipeSummaryContentWrapper}>
          <div className={styles.recipeSummaryContent}>
            <h1>{title}</h1>
            <div>
              <PortableText blocks={_rawExcerpt} />
            </div>
            <div className={styles.recipeSummaryContentMetrics}>
              <RecipeMetric Icon={RiKnifeFill} text="prep time" quantity="30 min" />
              <RecipeMetric Icon={GiCookingPot} text="cooktime" quantity="20 min" />
              <RecipeMetric Icon={GiForkKnifeSpoon} text="servings" quantity="4" />
            </div>
          </div>
        </div>
      </div>
      <Container>
        <div className={styles.mainContent}>
          <div className={styles.recipeContainer}>
            <div className={styles.recipeIngredients}>
              <h1>Ingredients</h1>
              <ul>
                {recipeIngredients.map((value, index) => {
                  return <li key={index}>{value.text}</li>;
                })}
              </ul>
            </div>
            <div className={styles.recipeInstructions}>
              <h1>Instructions</h1>
              <ol>
                {recipeInstructions.map((value, index) => {
                  return <li key={index}>{value.text}</li>;
                })}
              </ol>
              <br />
              {recipeNotes.length > 0 && (
                <div className={styles.recipeNotes}>
                  <h2>Notes</h2>
                  <ul>
                    {recipeNotes.map((value, index) => {
                      return <li key={index}>{value}</li>;
                    })}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </article>
  );
}

export default Recipe;
