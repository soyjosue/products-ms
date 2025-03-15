import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  DATABASE_URL: string;
}

const envSchema = joi.object<EnvVars>({
  PORT: joi.number().required(),
  DATABASE_URL: joi.string().required(),
});

function validateEnv<T>(
  schema: joi.ObjectSchema<T>,
  env: NodeJS.ProcessEnv,
): T {
  const result = schema.validate(env, {
    allowUnknown: true,
    convert: true,
  });

  if (result.error)
    throw new Error(`Config validation error: ${result.error.message}`);

  return result.value;
}

const { PORT: port, DATABASE_URL: databaseUrl } = validateEnv(
  envSchema,
  process.env,
);

export const envs = {
  port,
  databaseUrl,
};
