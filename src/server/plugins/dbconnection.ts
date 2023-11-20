import mongoose from 'mongoose';

export default async function () {
  const config = useRuntimeConfig();

  try {
    console.info('[MongoDB]: Connecting...');
    await mongoose.connect(config.mongoConnectionString);
    console.info('[MongoDB]: Connected');
  } catch (error) {
    console.info('[MongoDB]: Unconnected...');
    console.error(`[MongoDB]: ${error}`);
    process.exit(1);
  }
}
