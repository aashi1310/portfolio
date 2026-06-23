$files = @(
    'src/components/Achievements.tsx',
    'src/components/Contact.tsx',
    'src/components/Experience.tsx',
    'src/components/Projects.tsx'
)

foreach ($file in $files) {
    $content = Get-Content $file -Raw
    # Remove useInView import from framer-motion imports
    $content = $content -replace ', useInView', ''
    # Remove const inView = useInView(...) lines
    $content = $content -replace "  const inView = useInView\(ref, \{ once: true, margin: '-100px' \}\);\r?\n", ''
    $content = $content -replace "  const inView = useInView\(ref, \{ once: true \}\);\r?\n", ''
    # Also remove useRef that only served inView
    Set-Content $file $content -NoNewline
    Write-Output "Fixed: $file"
}
