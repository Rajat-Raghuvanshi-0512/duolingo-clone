'use server';

import { getUserSubscription } from '@/db/queries';
import { stripe } from '@/lib/stripe';
import { absoluteUrl } from '@/lib/utils';
import { auth, currentUser } from '@clerk/nextjs/server';

export const createStripeUrl = async () => {
  const { userId } = await auth();
  const user = await currentUser();
  if (!userId || !user) {
    throw new Error('Unauthorized');
  }
  const existingUserSubscription = await getUserSubscription();
  if (existingUserSubscription && existingUserSubscription.stripeCustomerId) {
    const stripeSession = await stripe.billingPortal.sessions.create({
      customer: existingUserSubscription.stripeCustomerId,
      return_url: absoluteUrl('/shop'),
    });
    return stripeSession.url;
  }

  const stripeSession = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'subscription',
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: 'INR',
          product_data: {
            name: 'Duolingo Clone Pro Subscription',
            description: 'Get unlimited hearts for your Duolingo Clone',
          },
          unit_amount: 999 * 100,
          recurring: {
            interval: 'month',
          },
        },
      },
    ],
    customer_email: user.emailAddresses[0].emailAddress,
    metadata: {
      userId,
    },
    success_url: absoluteUrl('/shop'),
    cancel_url: absoluteUrl('/shop'),
  });
  return stripeSession.url;
};
