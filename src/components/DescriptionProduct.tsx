import React from "react";

type Props = {};

const DescriptionProduct = (props: Props) => {
  return (
    <section className="description">
      <div className="container">
        <div className="description-heading">
          <h3 className="description-category__current">Description</h3>
          <h3 className="description-category-different">
            Additional Information
          </h3>
          <h3 className="description-category-different">Reviews [5]</h3>
        </div>
        {/* Paragraph */}
        <div className="description-main">
          <p>
            Embodying the raw, wayward spirit of rock ‘n’ roll, the Kilburn
            portable active stereo speaker takes the unmistakable look and sound
            of Marshall, unplugs the chords, and takes the show on the road.
          </p>
          <p>
            Weighing in under 7 pounds, the Kilburn is a lightweight piece of
            vintage styled engineering. Setting the bar as one of the loudest
            speakers in its class, the Kilburn is a compact, stout-hearted hero
            with a well-balanced audio which boasts a clear midrange and
            extended highs for a sound that is both articulate and pronounced.
            The analogue knobs allow you to fine tune the controls to your
            personal preferences while the guitar-influenced leather strap
            enables easy and stylish travel.
          </p>
        </div>
        <div className="description-images">
          <div className="description-images__wrapper">
            <img
              src="https://fastly.picsum.photos/id/116/800/1100.jpg?hmac=u6AbzHjpRHirO-Cz9hnsPVrkcNzmaVk5p2QIl5xeZtI"
              alt="true"
            />
          </div>
          <div className="description-images__wrapper">
            <img
              src="https://fastly.picsum.photos/id/116/800/1100.jpg?hmac=u6AbzHjpRHirO-Cz9hnsPVrkcNzmaVk5p2QIl5xeZtI"
              alt="true"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DescriptionProduct;
