"use client";
import classes from "./image-picker.module.css";
import { useRef, React, useState } from "react";
import Image from "next/image";

export default function ImagePicker({ label, name }) {
  const [pickImage, setPickedImage] = useState();
  const imageInputRef = useRef();

  function handlePickImage() {
    imageInputRef.current.click();
  }

  function handleImageChange(event) {
    const file = event.target.files[0];
    if (!file) {
      setPickedImage(null);
      return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
      setPickedImage(e.target.result);
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className={classes.picker}>
      <label htmlFor={name} className={classes.label}>
        {label}
      </label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {pickImage && <p>No image picked yet.</p>}
          {pickImage && (
            <Image
              src={pickImage}
              alt="Picked Image by the user."
              fill
              className={classes.image}
            />
          )}
        </div>
        <input
          className={classes.input}
          type="file"
          id={name}
          name={name}
          accept="image/png, image/jpeg"
          ref={imageInputRef}
          onChange={handleImageChange}
          required
        />
        <button
          type="button"
          className={classes.button}
          onClick={handlePickImage}
        >
          Pick an Image
        </button>
      </div>
    </div>
  );
}
