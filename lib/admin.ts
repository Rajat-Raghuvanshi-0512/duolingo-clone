import { auth, currentUser } from '@clerk/nextjs/server';

const adminEmails = ['rajat.karnal@gmail.com'];

export const isAdmin = async () => {
  const { userId } = await auth();
  if (!userId) {
    return false;
  }
  const user = await currentUser();
  if (!user) {
    return false;
  }
  return adminEmails.includes(user.emailAddresses[0].emailAddress);
};
