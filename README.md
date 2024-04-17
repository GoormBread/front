# Git Branching 및 Commit Message Guide 🌟

## Branching Strategy 🌿

| 브랜치 이름       | 설명                                           |
|-------------------|------------------------------------------------|
| **main**          | 프로덕션 릴리스를 위한 안정화된 브랜치          |
| **develop**       | 개발용 브랜치. 모든 개발자들은 여기에서 작업   |
| **feature-\<기능명>** | 새로운 기능 개발을 위한 브랜치               |
| **bugfix-\<버그번호>** | 버그 수정을 위한 브랜치                    |

## Commit Message Guide 💬

Git 커밋 메시지는 다음과 같은 형식을 따라 작성되어야 합니다:

| 커밋 타입       | 설명                                           |
|----------------|------------------------------------------------|
| **feat**       | 새로운 기능 추가                               |
| **fix**        | 버그 수정                                      |
| **docs**       | 문서 변경                                      |
| **style**      | 코드 형식 변경(공백, 세미콜론 등의 변화가 없는 경우) |
| **refactor**   | 코드 리팩토링                                  |
| **test**       | 테스트 코드 추가/수정                           |
| **chore**      | 그 외 자잘한 작업                              |

### 커밋 요약(Summary)

커밋의 간단한 요약입니다. 50자를 넘지 않도록 해야 합니다.

### 커밋 설명(Description)

커밋에 대한 자세한 설명입니다. 선택사항이며, 필요에 따라 작성합니다.
