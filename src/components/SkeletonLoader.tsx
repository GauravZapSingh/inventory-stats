import Skeleton from '@mui/material/Skeleton';

const SkeletonLoader = () => (
    <div className="skeleton">
        <div className="row skeleton__row">
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
        </div>
        <Skeleton sx={{ bgcolor: 'grey', borderRadius: '10px' }} variant="rounded" height={600} />
    </div>
)

export default SkeletonLoader;