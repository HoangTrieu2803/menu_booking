import { useEffect, useState } from "react"

export default function Pagination(props: { foodsPerPage: number, totalFood: number, paginate: any, currentPage: number}) {

    const { foodsPerPage, totalFood, paginate, currentPage } = props
    const [pageNumber, setPageNumber] = useState<Number[]>([]);

    const totalPage =Math.ceil(totalFood / foodsPerPage);
    useEffect(() => {
        const listPageNumber = []
        for (let i = 1; i <= totalPage; i++) {
            listPageNumber.push(i)
        }
        setPageNumber(listPageNumber);
    }, [totalPage])

    return (
        <>
            {pageNumber.map((number : any, index) => {
                return (
                    <li className='paginationAdmin__item' data-testid="paginationAdmin_" key={index} >
                        <a onClick={() => {
                            paginate(number)
                        }} href="/#" className={`paginationAdmin__item__link ${number === currentPage ? "paginationAdmin__item--active" : ""}`}>
                            {number}
                        </a>
                    </li>
                )
            })}
        </>
    )
}
