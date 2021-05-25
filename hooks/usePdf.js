import JsPDF from 'jspdf';
import { useCallback, useEffect, useState } from 'react';

export default function usePdf(docTitle = '', element = null) {
  const document = new JsPDF();

  return useCallback(
    async () =>
      await document.html(element.current, {
        callback: (doc) => {
          doc.save(`${docTitle}.pdf`);
        },
        x: 10,
        y: 10,
      }),
    [docTitle, element]
  );
}
