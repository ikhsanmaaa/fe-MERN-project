import { LIMIT_LIST } from "@/constants/list.constants";
import useChangeUrl from "@/hooks/useChangeUrl";
import { Divider, Pagination, Select, SelectItem } from "@heroui/react";

interface PropTypes {
  total: number;
  totalPages: number;
}

const EventFooter = (props: PropTypes) => {
  const { total, totalPages } = props;
  const { currentLimit, currentPage, handleChangePage, handleChangeLimit } =
    useChangeUrl();
  return (
    <div>
      <div>
        <div className="flex flex-col gap-4 lg:flex-row items-center justify-between px-2 py-2">
          <Select
            className="max-w-28 "
            size="md"
            selectedKeys={[String(currentLimit)]}
            selectionMode="single"
            onChange={handleChangeLimit}
            startContent={<p className="text-small">Show:</p>}
            items={LIMIT_LIST}
            disallowEmptySelection
          >
            {(item) => (
              <SelectItem key={String(item.value)}>{item.label}</SelectItem>
            )}
          </Select>
          {totalPages > 1 && (
            <Pagination
              isCompact
              showControls
              color="danger"
              page={currentPage}
              total={totalPages}
              onChange={handleChangePage}
              loop
            />
          )}
        </div>
      </div>
    </div>
  );
};
export default EventFooter;
