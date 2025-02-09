'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { GALLERY_IMAGES } from '@/lib/constants/images';
import { GalleryModal } from './gallery-modal';
import { GalleryCard } from './gallery-card';
import { animations } from '@/lib/animations/gallery';
import { useGalleryNavigation } from '@/hooks/use-gallery-navigation';
import { Button } from '@/components/ui/button';
import { sortMedia } from '@/lib/utils/media';
import type { SortOrder } from '@/types';

// 1ページあたりの表示アイテム数（パフォーマンスと閲覧性を考慮して20に設定）
const ITEMS_PER_PAGE = 20;

export function GalleryGrid() {
  // 選択中のメディアID
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);
  // 現在のページ番号
  const [currentPage, setCurrentPage] = useState(1);
  // ソート順
  const [sortOrder, setSortOrder] = useState<SortOrder>('newest');

  // ソート済みの画像配列を生成
  const sortedImages = sortMedia(GALLERY_IMAGES, sortOrder);

  // 選択中のメディアを特定
  const selectedImage = selectedImageId
    ? sortedImages.find(img => img.id === selectedImageId) || null
    : null;

  // ページネーション処理
  const totalPages = Math.ceil(sortedImages.length / ITEMS_PER_PAGE);
  const paginatedImages = sortedImages.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // ナビゲーション処理
  // useGalleryNavigationフックを使用して、
  // キーボードやスワイプによるナビゲーションを実現
  const handleNavigate = useGalleryNavigation(
    GALLERY_IMAGES,
    selectedImage,
    (image) => setSelectedImageId(image?.id ?? null)
  );

  return (
    <div className="space-y-8">
      {/* ソートコントロール */}
      <div className="flex justify-end gap-2">
        <Button
          variant={sortOrder === 'newest' ? 'default' : 'outline'}
          onClick={() => setSortOrder('newest')}
        >
          最新順
        </Button>
        <Button
          variant={sortOrder === 'oldest' ? 'default' : 'outline'}
          onClick={() => setSortOrder('oldest')}
        >
          古い順
        </Button>
        <Button
          variant={sortOrder === 'title' ? 'default' : 'outline'}
          onClick={() => setSortOrder('title')}
        >
          タイトル順
        </Button>
      </div>

      {/* グリッドレイアウト */}
      <motion.div
        className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4"
        variants={animations.container}
        initial="hidden"
        animate="show"
      >
        {paginatedImages.map((image) => (
          <motion.div key={image.id} variants={animations.item} layout>
            <GalleryCard
              media={image}
              onClick={() => setSelectedImageId(image.id)}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* ページネーションコントロール */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 py-4">
          <Button
            variant="outline"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            前へ
          </Button>
          <div className="flex items-center gap-2">
            {(() => {
              const pages: (number | string)[] = [];
              const addPageNumber = (pageNum: number) => {
                pages.push(pageNum);
              };
              const addEllipsis = () => {
                if (pages[pages.length - 1] !== '...') {
                  pages.push('...');
                }
              };

              // 常に最初のページを表示
              addPageNumber(1);

              // 現在のページの前後2ページを表示
              for (let i = Math.max(2, currentPage - 2); i <= Math.min(totalPages - 1, currentPage + 2); i++) {
                if (i === 2) {
                  if (currentPage > 4) addEllipsis();
                }
                addPageNumber(i);
                if (i === totalPages - 1) {
                  if (currentPage < totalPages - 3) addEllipsis();
                }
              }

              // 常に最後のページを表示
              if (totalPages > 1) {
                addPageNumber(totalPages);
              }

              return pages.map((page) => (
                typeof page === 'number' ? (
                  <Button
                    key={`page-${page}`}
                    variant={currentPage === page ? "default" : "outline"}
                    onClick={() => setCurrentPage(page)}
                    className="min-w-[40px]"
                  >
                    {page}
                  </Button>
                ) : (
                  <span key={`ellipsis-${pages.indexOf(page)}`} className="px-2">
                    {page}
                  </span>
                )
              ));
            })()}
          </div>
          <Button
            variant="outline"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            次へ
          </Button>
        </div>
      )}

      {/* モーダル */}
      <GalleryModal
        media={GALLERY_IMAGES}
        selectedMedia={selectedImage}
        onClose={() => setSelectedImageId(null)}
        onNavigate={handleNavigate}
      />
    </div>
  );
}

export default GalleryGrid;