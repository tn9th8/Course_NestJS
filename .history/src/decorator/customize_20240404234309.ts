import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
// tạo decorator Public để truyền thêm Metadate vào function
// Metdate sẽ được lấy theo key: value
