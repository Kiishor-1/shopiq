export const calculateRatings = (reviews) => {
    const ratingCount = [0, 0, 0, 0, 0];

    reviews.length  > 0 && reviews.forEach((review) => {
        const rating = Math.floor(review.rating);
        if (rating >= 1 && rating <= 5) {
            ratingCount[rating - 1] += 1;
        }
    });

    const totalRatings = reviews.length;
    const totalScore = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = totalRatings > 0 ? (totalScore / totalRatings).toFixed(1) : 0;

    const ratingBreakdown = ratingCount.map((count) => {
        const percentage = totalRatings > 0 ? ((count / totalRatings) * 100).toFixed(1) : 0;
        return { rating: ratingCount.indexOf(count) + 1, percentage: parseFloat(percentage) };
    });

    return {
        average: parseFloat(averageRating),
        totalRatings,
        ratingBreakdown
    };
};
