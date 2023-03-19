export interface SearchUsersTotalCountOutboundPort {
  execute(nickname: string): Promise<number>;
}
