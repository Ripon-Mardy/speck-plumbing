import { useMemo, useState } from 'react';
import { ArrowUpDown, ExternalLink, MessageSquarePlus, Share2, Star, ThumbsUp, X } from 'lucide-react';
import {
  BUSINESS_INFO,
  CUSTOMER_REVIEWS,
  HIGHLIGHTED_SNIPPETS,
  RATING_BREAKDOWN,
  REVIEW_TOPICS,
  type CustomerReview,
  type ReviewTopic,
} from '../data/speckData';

interface ReviewsSectionProps {
  onNotify: (message: string) => void;
}

type SortOption = 'relevant' | 'newest' | 'highest';

export function ReviewsSection({ onNotify }: ReviewsSectionProps) {
  const [activeTopic, setActiveTopic] = useState<ReviewTopic>('All');
  const [sortBy, setSortBy] = useState<SortOption>('relevant');
  const [reviews, setReviews] = useState<CustomerReview[]>(CUSTOMER_REVIEWS);
  const [likedIds, setLikedIds] = useState<Record<string, boolean>>({});
  const [modalOpen, setModalOpen] = useState(false);

  const [newAuthor, setNewAuthor] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newText, setNewText] = useState('');
  const [newTopic, setNewTopic] = useState<ReviewTopic>('speedy work');
  const [formError, setFormError] = useState('');

  const filteredReviews = useMemo(() => {
    const base =
      activeTopic === 'All'
        ? reviews
        : reviews.filter((r) => r.topics.includes(activeTopic));

    return [...base].sort((a, b) => {
      if (sortBy === 'newest') return a.sortOrder - b.sortOrder;
      if (sortBy === 'highest') return b.rating - a.rating || a.sortOrder - b.sortOrder;
      return a.sortOrder - b.sortOrder;
    });
  }, [activeTopic, reviews, sortBy]);

  const toggleLike = (id: string) => {
    setLikedIds((prev) => {
      const next = !prev[id];
      if (next) {
        onNotify('Marked review as helpful.');
      }
      return { ...prev, [id]: next };
    });
  };

  const handleShareReview = async (review: CustomerReview) => {
    const snippet = `"${review.text}" — ${review.author} on Speck Plumbing (Dallas, TX)`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Speck Plumbing Review',
          text: snippet,
          url: window.location.href,
        });
        return;
      } catch {
        // User cancelled native share; fall back to copy
      }
    }
    try {
      await navigator.clipboard.writeText(snippet);
      onNotify('Review quote copied to clipboard.');
    } catch {
      onNotify('Unable to copy automatically.');
    }
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || newText.trim().length < 12) {
      setFormError('Please enter your name and at least a short sentence about your service.');
      return;
    }

    const created: CustomerReview = {
      id: `local-${Date.now()}`,
      author: newAuthor.trim(),
      meta: 'East Dallas Neighbor',
      timeAgo: 'Just now',
      sortOrder: 0,
      rating: newRating,
      text: newText.trim(),
      topics: ['All', newTopic],
    };

    setReviews((prev) => [created, ...prev]);
    setActiveTopic('All');
    setModalOpen(false);
    setNewAuthor('');
    setNewText('');
    setNewRating(5);
    setFormError('');
    onNotify('Thank you! Your review has been added to the page.');
  };

  return (
    <section id="reviews" className="py-16 lg:py-24 bg-white border-b border-slate-200">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <p className="text-xs font-medium text-[#C84B24] mb-2">
              Verified Customer Reputation
            </p>
            <h2
              className="font-display text-3xl sm:text-4xl font-bold text-[#0B1F3A] tracking-tight"
              style={{ textWrap: 'balance' }}
            >
              Rated 4.9 out of 5 by East Dallas homeowners.
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-[#0B1F3A] hover:bg-[#163259] rounded-md transition-colors whitespace-nowrap cursor-pointer"
            >
              <MessageSquarePlus className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>Write a Review</span>
            </button>
            <a
              href={BUSINESS_INFO.mapsQueryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold text-[#0B1F3A] bg-slate-100 hover:bg-slate-200 rounded-md transition-colors whitespace-nowrap"
            >
              <span>View on Google</span>
              <ExternalLink className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10 p-6 sm:p-8 bg-[#F8F9FA] border border-slate-200 rounded-lg">
          <div className="lg:col-span-4 flex flex-col justify-center lg:border-r lg:border-slate-200 lg:pr-8">
            <div className="flex items-baseline gap-3">
              <span className="font-display font-bold text-5xl text-[#0B1F3A] tabular-nums">
                {BUSINESS_INFO.rating.toFixed(1)}
              </span>
              <div>
                <div className="flex items-center gap-1" aria-label="4.9 out of 5 stars">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="w-4 h-4 fill-[#D97706] text-[#D97706]"
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="text-sm text-slate-600 mt-1 tabular-nums">
                  {reviews.length > CUSTOMER_REVIEWS.length
                    ? BUSINESS_INFO.reviewCount + (reviews.length - CUSTOMER_REVIEWS.length)
                    : BUSINESS_INFO.reviewCount}{' '}
                  Google reviews
                </p>
              </div>
            </div>

            <div className="mt-5 space-y-1.5">
              {RATING_BREAKDOWN.map((row) => (
                <div key={row.stars} className="flex items-center gap-3 text-xs">
                  <span className="font-mono tabular-nums w-3 text-slate-600">{row.stars}</span>
                  <div className="flex-1 h-2 bg-slate-200 rounded-sm overflow-hidden">
                    <div
                      className="h-full bg-[#D97706]"
                      style={{ width: `${row.percent}%` }}
                    />
                  </div>
                  <span className="font-mono tabular-nums w-6 text-right text-slate-500">
                    {row.count}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-8 flex flex-col justify-between">
            <div>
              <p className="text-xs font-medium text-slate-500 mb-3">
                Google Review Summary Highlights
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {HIGHLIGHTED_SNIPPETS.map((quote) => (
                  <blockquote
                    key={quote}
                    className="p-4 bg-white border border-slate-200 rounded-md text-sm text-slate-700 leading-relaxed"
                  >
                    “{quote}”
                  </blockquote>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-1.5" role="tablist" aria-label="Filter reviews by topic">
                {REVIEW_TOPICS.map((topic) => {
                  const active = activeTopic === topic.label;
                  return (
                    <button
                      key={topic.label}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => setActiveTopic(topic.label)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                        active
                          ? 'bg-[#0B1F3A] text-white'
                          : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <span className="capitalize">{topic.label}</span>
                      <span className={`ml-1.5 font-mono tabular-nums ${active ? 'text-slate-300' : 'text-slate-500'}`}>
                        {topic.count}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <ArrowUpDown className="w-3.5 h-3.5 text-slate-500" aria-hidden="true" />
                <label htmlFor="review-sort" className="sr-only">
                  Sort reviews
                </label>
                <select
                  id="review-sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-md px-3 py-1.5 cursor-pointer"
                >
                  <option value="relevant">Most relevant</option>
                  <option value="newest">Newest first</option>
                  <option value="highest">Highest rated</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredReviews.map((review) => {
            const isLiked = !!likedIds[review.id];
            return (
              <article
                key={review.id}
                className="p-6 sm:p-7 bg-white border border-slate-200 rounded-lg flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <h3 className="font-display font-bold text-base text-[#0B1F3A]">
                        {review.author}
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {review.meta} · {review.timeAgo}
                      </p>
                    </div>
                    <div className="flex items-center gap-0.5 shrink-0" aria-label={`${review.rating} stars`}>
                      {Array.from({ length: review.rating }).map((_, idx) => (
                        <Star
                          key={idx}
                          className="w-3.5 h-3.5 fill-[#D97706] text-[#D97706]"
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                  </div>

                  <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                    {review.text}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
                  <div className="text-xs text-slate-500 truncate">
                    {review.topics
                      .filter((t) => t !== 'All')
                      .slice(0, 3)
                      .map((t) => t.charAt(0).toUpperCase() + t.slice(1))
                      .join(' · ')}
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => toggleLike(review.id)}
                      aria-pressed={isLiked}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                        isLiked
                          ? 'bg-[#0B1F3A] text-white'
                          : 'text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <ThumbsUp className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>{isLiked ? 'Helpful (1)' : 'Like'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleShareReview(review)}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-md transition-colors cursor-pointer"
                    >
                      <Share2 className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Share</span>
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="write-review-title"
        >
          <div className="w-full max-w-lg bg-white border border-slate-200 rounded-lg p-6 sm:p-7 shadow-xl">
            <div className="flex items-center justify-between gap-4 mb-4">
              <h3 id="write-review-title" className="font-display text-xl font-bold text-[#0B1F3A]">
                Share Your Experience with Speck Plumbing
              </h3>
              <button
                type="button"
                aria-label="Close review modal"
                onClick={() => setModalOpen(false)}
                className="p-2 text-slate-500 hover:text-slate-800 rounded-md cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div>
                <label htmlFor="review-author" className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Your Name
                </label>
                <input
                  id="review-author"
                  type="text"
                  value={newAuthor}
                  onChange={(e) => setNewAuthor(e.target.value)}
                  placeholder="e.g., Sarah Jenkins"
                  className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-md bg-white text-slate-900"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span className="block text-xs font-semibold text-slate-700 mb-1.5">Rating</span>
                  <div className="flex items-center gap-1.5 py-1.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        aria-label={`Rate ${star} stars`}
                        onClick={() => setNewRating(star)}
                        className="p-1 cursor-pointer"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= newRating
                              ? 'fill-[#D97706] text-[#D97706]'
                              : 'text-slate-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="review-topic" className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Service Highlight
                  </label>
                  <select
                    id="review-topic"
                    value={newTopic}
                    onChange={(e) => setNewTopic(e.target.value as ReviewTopic)}
                    className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-md bg-white text-slate-900"
                  >
                    {REVIEW_TOPICS.filter((t) => t.label !== 'All').map((t) => (
                      <option key={t.label} value={t.label}>
                        {t.label.charAt(0).toUpperCase() + t.label.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="review-body" className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Review Details
                </label>
                <textarea
                  id="review-body"
                  rows={4}
                  value={newText}
                  onChange={(e) => setNewText(e.target.value)}
                  placeholder="Tell East Dallas neighbors how the crew helped with your plumbing..."
                  className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-md bg-white text-slate-900"
                />
              </div>

              {formError && (
                <p className="text-xs font-medium text-red-700 bg-red-50 border border-red-200 rounded-md px-3 py-2">
                  {formError}
                </p>
              )}

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-md cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-sm font-semibold text-white bg-[#C84B24] hover:bg-[#AD3E1B] rounded-md cursor-pointer"
                >
                  Post Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
