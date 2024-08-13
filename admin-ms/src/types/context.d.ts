import type { Context as HonoContext } from "hono"



export type Context<Env = Env, Path = void, Input = unknown> = HonoContext<Env, Path, Input>