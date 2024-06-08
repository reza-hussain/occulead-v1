import React from "react";
import { GetServerSidePropsContext } from "next";
import { getCookie } from "cookies-next";

// services
import { GET_STRIPE_SESSION_SUCCESS, GET_USER } from "services/apiUrl";
import ClinicPackages from "containers/subscription/clinic";
import Success from "containers/subscription/success";

const Subscription = (props: any) => {
  console.log({ props });
  return props?.stripe ? <Success /> : <ClinicPackages />;
};

export default Subscription;

export const getServerSideProps = async ({
  req,
  res,
  query
}: GetServerSidePropsContext) => {
  const token = getCookie("token", { req, res });

  const sessionID = query.session_id;

  try {
    const response = await fetch(`${GET_USER}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log({ response });
    const stripeResponse = sessionID
      ? await fetch(`${GET_STRIPE_SESSION_SUCCESS}/${sessionID}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
      : null;

    const data = await response?.json();
    const stripeData = await stripeResponse?.json();
    console.log({ stripeData });
    return {
      props: {
        success: true,
        user: data?.data,
        stripe: stripeData?.data ?? null
      }
    };
  } catch (error) {
    console.log({ error });

    return {
      props: {
        err: JSON.stringify(error),
        success: false
      }
    };
  }
};
