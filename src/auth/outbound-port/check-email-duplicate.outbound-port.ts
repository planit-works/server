export interface CheckEmailDuplicateOutboundPort {
  execute(email: string): Promise<boolean>;
}
