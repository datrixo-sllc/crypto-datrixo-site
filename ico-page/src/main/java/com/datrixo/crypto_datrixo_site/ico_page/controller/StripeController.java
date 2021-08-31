package com.datrixo.crypto_datrixo_site.ico_page.controller;


import com.google.gson.Gson;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import com.datrixo.crypto_datrixo_site.ico_page.dto.CheckoutDto;
import com.datrixo.crypto_datrixo_site.ico_page.dto.CheckoutPaymentDto;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping(value = "/stripe")
public class StripeController {
	private static Gson gson = new Gson();
	private static final String API_SECRET_KEY =
			"sk_test_51JSlryH9ApoYBcMsrIeaSN5qjoUTXKoC1EJLpcTpnc5vwZnruBl4RXK5yDm6CVZhu7yAsmRopC3WSduhle4oBGiS00oRh3a5SJ";

	@PostMapping("/payment")
	/**
	 * Payment with Stripe checkout page
	 * 
	 * @param payment
	 * @return
	 * @throws StripeException
	 */
	public String paymentWithCheckoutPage(@RequestBody CheckoutPaymentDto payment) throws StripeException {
		// We initilize stripe object with the api key
		init();
		// We create a stripe session
		SessionCreateParams params = SessionCreateParams.builder()
				// We will use the credit card payment method
				.addPaymentMethodType(SessionCreateParams.PaymentMethodType.CARD)
				.setMode(SessionCreateParams.Mode.PAYMENT).setSuccessUrl(payment.getSuccessUrl())
				.setCancelUrl(
						payment.getCancelUrl())
				.addLineItem(
						SessionCreateParams.LineItem.builder().setQuantity(payment.getQuantity())
								.setPriceData(
										SessionCreateParams.LineItem.PriceData.builder()
												.setCurrency(payment.getCurrency()).setUnitAmount(payment.getAmount())
												.setProductData(SessionCreateParams.LineItem.PriceData.ProductData
														.builder().setName(payment.getName()).build())
												.build())
								.build())
				.build();

		Session session = Session.create(params);

		Map<String, String> responseData = new HashMap<>();
		responseData.put("id", session.getId());

		return gson.toJson(responseData);
	}

	@PostMapping("/subscription")
	/**
	 * Used to create a subscription with strpe checkout page
	 * 
	 * @param checkout
	 * @return the subscription id
	 * @throws StripeException
	 */
	public String subscriptionWithCheckoutPage(@RequestBody CheckoutDto checkout) throws StripeException {
		SessionCreateParams params = new SessionCreateParams.Builder().setSuccessUrl(checkout.getSuccessUrl())
				.setCancelUrl(checkout.getCancelUrl()).addPaymentMethodType(SessionCreateParams.PaymentMethodType.CARD)
				.setMode(SessionCreateParams.Mode.SUBSCRIPTION).addLineItem(new SessionCreateParams.LineItem.Builder()
						.setQuantity(1L).setPrice(checkout.getPriceId()).build())
				.build();

		try {
			Session session = Session.create(params);
			Map<String, Object> responseData = new HashMap<>();
			responseData.put("sessionId", session.getId());
			return gson.toJson(responseData);
		} catch (Exception e) {
			Map<String, Object> messageData = new HashMap<>();
			messageData.put("message", e.getMessage());
			Map<String, Object> responseData = new HashMap<>();
			responseData.put("error", messageData);
			return gson.toJson(responseData);
		}
	}

	private static void init() {
		Stripe.apiKey = API_SECRET_KEY;
	}
}
