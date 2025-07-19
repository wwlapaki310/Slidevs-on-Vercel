// スライドメタデータ設定ファイル
// タグとスライドの情報を一元管理

export const slideMetadata = [
  {
    name: 'sre-next-2025',
    title: 'SRE NEXT 2025 - NoCスタッフ体験記',
    description: 'SRE NEXT 2025でNoCスタッフをやった話とSRE NEXTの講演紹介',
    date: '2025-07-17',
    author: 'Satoru Akita',
    tags: ['SRE', 'NoC', 'Infrastructure', 'Conference'],
    category: 'tech-talk',
    duration: '15分',
    level: 'intermediate',
    language: 'ja'
  },
  {
    name: 'slidev-system',
    title: 'Slidev × Vercel 複数スライド管理システム',
    description: '1つのリポジトリで複数のSlidevプレゼンテーションを効率的に管理する仕組みの解説',
    date: '2025-07-18',
    author: 'Satoru Akita',
    tags: ['Slidev', 'Vercel', 'DevOps', 'Automation'],
    category: 'system-design',
    duration: '20分',
    level: 'beginner',
    language: 'ja'
  }
];

// タグカテゴリとメタデータ
export const tagCategories = {
  technology: {
    name: '技術',
    tags: ['Slidev', 'Vercel', 'Vue.js', 'JavaScript', 'TypeScript', 'Node.js'],
    color: 'blue'
  },
  domain: {
    name: '分野',
    tags: ['SRE', 'DevOps', 'Infrastructure', 'Frontend', 'Backend'],
    color: 'green'
  },
  event: {
    name: 'イベント',
    tags: ['Conference', 'LT', 'Meetup', 'Workshop'],
    color: 'purple'
  },
  format: {
    name: '形式',
    tags: ['Tutorial', 'Automation', 'NoC', 'Demo'],
    color: 'orange'
  }
};

// 全タグを抽出する
export function extractAllTags(slides = slideMetadata) {
  const allTags = new Set();
  slides.forEach(slide => {
    slide.tags.forEach(tag => allTags.add(tag));
  });
  return Array.from(allTags).sort();
}

// カテゴリ別タグを取得
export function getTagsByCategory() {
  const result = {};
  Object.entries(tagCategories).forEach(([key, category]) => {
    result[key] = {
      ...category,
      tags: category.tags.filter(tag => 
        slideMetadata.some(slide => slide.tags.includes(tag))
      )
    };
  });
  return result;
}

// スライドにタグを追加
export function addTagToSlide(slideName, tag) {
  const slide = slideMetadata.find(s => s.name === slideName);
  if (slide && !slide.tags.includes(tag)) {
    slide.tags.push(tag);
    return true;
  }
  return false;
}

// スライドからタグを削除
export function removeTagFromSlide(slideName, tag) {
  const slide = slideMetadata.find(s => s.name === slideName);
  if (slide) {
    slide.tags = slide.tags.filter(t => t !== tag);
    return true;
  }
  return false;
}

// タグの使用統計を取得
export function getTagStats() {
  const stats = {};
  slideMetadata.forEach(slide => {
    slide.tags.forEach(tag => {
      stats[tag] = (stats[tag] || 0) + 1;
    });
  });
  return stats;
}

export default slideMetadata;
