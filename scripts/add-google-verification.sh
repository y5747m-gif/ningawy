#!/usr/bin/env bash
#
# ينشئ ملف تحقّق ملكية الموقع لـ Google Search Console (طريقة رفع ملف HTML).
# Creates the Google Search Console HTML site-verification file.
#
# الاستعمال | Usage:
#   scripts/add-google-verification.sh <google-site-verification: token>
#   scripts/add-google-verification.sh <full-line-from-the-file>
#
# أمثلة | Examples:
#   scripts/add-google-verification.sh 1AbCDeFgHiJkLmNoPqRsTuVwXyZ_0123456789
#   scripts/add-google-verification.sh "google-site-verification: google205aca17c5a4688e.html"
#
# ملاحظة: اسم الملف مُثبَّت على google205aca17c5a4688e.html لأن جوجل تشترط
# تطابق الاسم حرفيًا مع ما يظهر في Search Console.
# The filename is pinned to google205aca17c5a4688e.html — Google requires an
# exact name match.

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
FILENAME="google205aca17c5a4688e.html"
TARGET="$REPO_ROOT/$FILENAME"

if [[ $# -ne 1 || -z "${1// /}" ]]; then
  echo "خطأ | Error: مرّر رمز التحقّق كمعامل واحد." >&2
  echo "  مثال | Example: scripts/add-google-verification.sh 1AbCDeFgHiJk..." >&2
  exit 2
fi

TOKEN="$1"
PREFIX="google-site-verification: "

# 1) أزل المسافات المحيطة أولًا.
# 1) Trim surrounding whitespace first.
TOKEN="${TOKEN%"${TOKEN##*[![:space:]]}"}"
TOKEN="${TOKEN#"${TOKEN%%[![:space:]]*}"}"

# 2) أزل علامات الاقتباس المحيطة (قد تأتي من النسخ من طرفية).
# 2) Strip surrounding quotes (may come from copying out of a terminal).
TOKEN="${TOKEN%\"}"; TOKEN="${TOKEN#\"}"
TOKEN="${TOKEN%\'}"; TOKEN="${TOKEN#\'}"

# 3) أعد القص بعد نزع الاقتباس، ثم استخرج الرمز إن لُصق السطر الكامل.
# 3) Re-trim, then extract the token if the whole line was pasted.
TOKEN="${TOKEN%"${TOKEN##*[![:space:]]}"}"
TOKEN="${TOKEN#"${TOKEN%%[![:space:]]*}"}"
if [[ "$TOKEN" == "${PREFIX}"* ]]; then
  TOKEN="${TOKEN#"$PREFIX"}"
fi

if [[ -z "$TOKEN" ]]; then
  echo "خطأ | Error: الرمز فارغ بعد التنظيف." >&2
  exit 2
fi

if [[ "$TOKEN" == *$'\n'* ]]; then
  echo "خطأ | Error: الرمز يجب أن يكون سطرًا واحدًا." >&2
  exit 2
fi

# المحتوى الرسمي لملف تحقّق جوجل: سطر واحد بلا <html> وبلا وسم نهاية سطر إضافي.
# Google's verification file is a single line, no HTML markup.
printf 'google-site-verification: %s\n' "$TOKEN" > "$TARGET"

echo "تم إنشاء | Created: $TARGET"
echo "المحتوى | Content:"
cat "$TARGET"
echo "الحجم | Size: $(wc -c < "$TARGET") bytes"
