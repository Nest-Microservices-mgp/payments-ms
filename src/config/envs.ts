import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  STRIPE_SECRET: string;
}

const envVarsSchema = joi
  .object<EnvVars>({
    PORT: joi.number().default(3000),
    STRIPE_SECRET: joi.string().required(),
  })
  .unknown();

const { error, value: envVars } = envVarsSchema.validate({
  ...process.env,
});

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const envs = {
  port: envVars.PORT,
  stripeSecret: envVars.STRIPE_SECRET,
};
