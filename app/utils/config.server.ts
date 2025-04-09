import { parseZodError } from '~/utils/functions.server';
import { z } from 'zod';

const config = {
	baseUrl: (process.env.BASE_URL || '').replace(/\/$/, ''),
	sessionSecret: process.env.SESSION_SECRET!,
} satisfies z.infer<typeof ConfigSchema>;

const ConfigSchema = z.object({
	baseUrl: z.string(),
	sessionSecret: z.string(),
});

const validatedConfig = ConfigSchema.safeParse(config);
if (!validatedConfig.success) throw new Error(JSON.stringify(parseZodError(validatedConfig.error), null, 5));

export default validatedConfig.data;
