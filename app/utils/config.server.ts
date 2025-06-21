import { parseZodError } from '~/utils/functions.server';
import { z } from 'zod';

const config = {
	baseUrl: (process.env.BASE_URL || '').replace(/\/$/, ''),
	sessionSecret: process.env.SESSION_SECRET!,

	port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
} satisfies z.infer<typeof ConfigSchema>;

const ConfigSchema = z.object({
	baseUrl: z.string(),
	sessionSecret: z.string(),

	port: z.number().int().min(1).max(65535),
});

const validatedConfig = ConfigSchema.safeParse(config);
if (!validatedConfig.success) throw new Error(JSON.stringify(parseZodError(validatedConfig.error), null, 5));

export default validatedConfig.data;
