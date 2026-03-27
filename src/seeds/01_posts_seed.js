/**
 * @param { import("knex").Knex } knex
 */
export async function seed(knex) {
  // Clear existing data
  await knex('posts').del();

  // Insert sample posts
  await knex('posts').insert([
    {
      title: 'First Post',
      content: 'This is the first post content.',
      slug: 'first-post',
      author_id: 1,
      is_published: true,
      published_at: new Date(),
      views: 10,
      meta: JSON.stringify({ tags: ['intro', 'welcome'] })
    },
    {
      title: 'Docker Tips for Beginners',
      content: 'Learn how to avoid common Docker mistakes...',
      slug: 'docker-tips',
      author_id: 1,
      is_published: true,
      published_at: new Date(),
      views: 25,
      meta: JSON.stringify({ tags: ['docker', 'devops'] })
    },
    {
      title: 'Draft Post',
      content: 'This post is not published yet.',
      slug: 'draft-post',
      author_id: 2,
      is_published: false,
      published_at: null,
      views: 0,
      meta: JSON.stringify({ tags: ['draft'] })
    }
  ]);
}
