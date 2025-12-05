"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import css from "./BookingForm.module.css";
import DatePickerField from "./DatePickerField";
import toast from "react-hot-toast";

type BookingFormValues = {
  name: string;
  email: string;
  bookingDate: string;
  comment: string;
};

const initialValues: BookingFormValues = {
  name: "",
  email: "",
  bookingDate: "",
  comment: "",
};

const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters.")
    .max(50, "Name must be at most 50 characters.")
    .required("Name is required."),
  email: Yup.string()
    .email("Please enter a valid email address.")
    .required("Email is required."),
  bookingDate: Yup.string().required("Booking date is required."),
  comment: Yup.string().max(500, "Comment must be at most 500 characters."),
});

export default function BookingForm() {
  const handleSubmit = (values: BookingFormValues, { resetForm }: any) => {
    console.log("Booking form:", values);

    toast.success(
      "Your booking request has been received. We will contact you soon!"
    );

    resetForm();
  };

  return (
    <div className={css.box}>
      <h3 className={css.boxTitle}>Book your campervan now</h3>
      <p className={css.formSubtitle}>
        Stay connected! We are always ready to help you.
      </p>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form className={css.form} noValidate>
            <label className={css.field}>
              <Field
                type="text"
                name="name"
                placeholder="Name*"
                className={`${css.input} ${
                  errors.name && touched.name ? css.inputError : ""
                }`}
              />
              <ErrorMessage
                name="name"
                component="span"
                className={css.error}
              />
            </label>

            <label className={css.field}>
              <Field
                type="email"
                name="email"
                placeholder="Email*"
                className={`${css.input} ${
                  errors.email && touched.email ? css.inputError : ""
                }`}
              />
              <ErrorMessage
                name="email"
                component="span"
                className={css.error}
              />
            </label>

            <DatePickerField name="bookingDate" />

            {/* Comment */}
            <label className={css.field}>
              <Field
                as="textarea"
                name="comment"
                placeholder="Comment"
                rows={4}
                className={`${css.textarea} ${
                  errors.comment && touched.comment ? css.inputError : ""
                }`}
              />
              <ErrorMessage
                name="comment"
                component="span"
                className={css.error}
              />
            </label>

            <button
              type="submit"
              className={css.submitBtn}
              disabled={isSubmitting}
            >
              Send
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
