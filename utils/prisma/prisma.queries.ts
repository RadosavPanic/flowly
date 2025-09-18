export const buildPostIncludeQuery = (userId: string) => ({
  user: { select: { displayName: true, username: true, img: true } },
  _count: { select: { likes: true, reposts: true, comments: true } },
  likes: { where: { userId: userId }, select: { id: true } },
  reposts: { where: { userId: userId }, select: { id: true } },
  saves: { where: { userId: userId }, select: { id: true } },
});
