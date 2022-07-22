export class CreateRateLimitDto {
  readonly _id: string;
  readonly ipAddress: string;
  readonly count: number;
}
