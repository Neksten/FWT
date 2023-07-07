export function createPages(pagesCount: number, currentPage: number) {
	const pages = <number[]>[]
	
	if (pagesCount > 3) {
		if(currentPage > 2 && currentPage < pagesCount) {
			for (let i = currentPage-1; i <= currentPage+1; i++) {
				pages.push(i)
				if(i == pagesCount) break
			}
		}
		else if (currentPage === pagesCount) {
			for (let i = currentPage-2; i <= currentPage+1; i++) {
				pages.push(i)
				if(i == pagesCount) break
			}
		}
		else {
			for (let i = 1; i <= 3; i++) {
				pages.push(i)
				if(i == pagesCount) break
			}
		}
	}  else {
		for (let i = 1; i <= pagesCount; i++) {
			pages.push(i)
		}
	}
	
	return pages;
}