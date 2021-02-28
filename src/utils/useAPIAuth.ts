import md5 from 'md5';

export const useAPIAuth = () => {
  const ts = Date.now().toString();
  const hash = md5(
    ts +
      process.env.NEXT_PUBLIC_API_SECRET_KEY +
      process.env.NEXT_PUBLIC_API_PUBLIC_KEY
  );
  return [ts, hash, process.env.NEXT_PUBLIC_API_PUBLIC_KEY];
};
