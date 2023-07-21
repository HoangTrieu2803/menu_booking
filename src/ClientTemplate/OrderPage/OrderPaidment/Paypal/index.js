import React, { useRef, useEffect,useState } from "react";

export default function Paypal(props) {
  const paypal = useRef();
  const {total} = JSON.parse(localStorage.getItem('order'));
  const {handleTest} = props
  const totalCAD = Number((total / 23000).toFixed(2));
  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions, err) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: "Thực đơn",
                amount: {
                  currency_code: "CAD",
                  value: totalCAD,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          handleTest('success')
        },
        onError: (err) => {
          console.log(err);
        },
      })
      .render(paypal.current);
  }, []);

  return (
    <div>
      <div ref={paypal}></div>
    </div>
  );
}