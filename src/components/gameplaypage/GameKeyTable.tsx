import React from "react";

interface GameKeyTableProps {
  className?: string;
}

export default function GameKeyTable({ className }: GameKeyTableProps) {
  return (
    <div className={`${className}`}>
      <table className="w-full h-full bg-white rounded-lg shadow-md overflow-hidden">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 font-semibold">버튼</th>
            <th className="py-2 px-4 font-semibold">기능</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-t">
            <td className="py-2 px-4">A</td>
            <td className="py-2 px-4">공격</td>
          </tr>
          <tr className="border-t">
            <td className="py-2 px-4">B</td>
            <td className="py-2 px-4">점프</td>
          </tr>
          <tr className="border-t">
            <td className="py-2 px-4">Select</td>
            <td className="py-2 px-4">일시정지</td>
          </tr>
          <tr className="border-t">
            <td className="py-2 px-4">Start</td>
            <td className="py-2 px-4">시작</td>
          </tr>
          <tr className="border-t">
            <td className="py-2 px-4">Up</td>
            <td className="py-2 px-4">위 바라보기</td>
          </tr>
          <tr className="border-t">
            <td className="py-2 px-4">Down</td>
            <td className="py-2 px-4">수그리기</td>
          </tr>
          <tr className="border-t">
            <td className="py-2 px-4">Left</td>
            <td className="py-2 px-4">왼쪽으로 이동</td>
          </tr>
          <tr className="border-t">
            <td className="py-2 px-4">Right</td>
            <td className="py-2 px-4">오른쪽으로 이동</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}