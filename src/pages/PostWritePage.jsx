import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useCreatePost, useUpdatePost, usePost } from '../hooks/usePosts'
import { useAuthStore } from '../store/authStore'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { Textarea } from '../components/ui/Textarea'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card'

/**
 * Post write/edit page
 */
export const PostWritePage = () => {
  const { slug, postId } = useParams()
  const navigate = useNavigate()
  const { isAuthenticated } = useAuthStore()

  const isEditMode = !!postId
  const { data: existingPost } = usePost(postId ? parseInt(postId) : null)

  const [title, setTitle] = useState(existingPost?.title || '')
  const [content, setContent] = useState(existingPost?.content || '')
  const [nickname, setNickname] = useState(existingPost?.nickname || '')
  const [image, setImage] = useState(null)

  const createPost = useCreatePost()
  const updatePost = useUpdatePost()

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!title.trim()) {
      alert('제목을 입력해주세요.')
      return
    }

    if (!content.trim()) {
      alert('내용을 입력해주세요.')
      return
    }

    if (!isAuthenticated() && !nickname.trim()) {
      alert('닉네임을 입력해주세요.')
      return
    }

    const postData = {
      gallery: slug,
      title: title.trim(),
      content: content.trim(),
      ...(!isAuthenticated() && { nickname: nickname.trim() }),
      ...(image && { image }),
    }

    if (isEditMode) {
      updatePost.mutate(
        { id: parseInt(postId), data: postData },
        {
          onSuccess: (data) => {
            navigate(`/g/${slug}/${data.id}`)
          },
        }
      )
    } else {
      createPost.mutate(postData, {
        onSuccess: (data) => {
          navigate(`/g/${slug}/${data.id}`)
        },
      })
    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      setImage(file)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <Card>
        <CardHeader>
          <CardTitle>
            {isEditMode ? '게시글 수정' : '새 게시글 작성'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Nickname (for anonymous users) */}
            {!isAuthenticated() && (
              <div>
                <label className="block text-sm font-medium mb-2">
                  닉네임 <span className="text-red-500">*</span>
                </label>
                <Input
                  placeholder="닉네임을 입력하세요"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  required
                />
              </div>
            )}

            {/* Title */}
            <div>
              <label className="block text-sm font-medium mb-2">
                제목 <span className="text-red-500">*</span>
              </label>
              <Input
                placeholder="제목을 입력하세요"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-medium mb-2">
                내용 <span className="text-red-500">*</span>
              </label>
              <Textarea
                placeholder="내용을 입력하세요"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={12}
                required
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium mb-2">
                이미지 첨부
              </label>
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              {existingPost?.image && !image && (
                <div className="mt-2">
                  <img
                    src={existingPost.image}
                    alt="기존 이미지"
                    className="max-w-xs rounded"
                  />
                </div>
              )}
            </div>

            {/* Buttons */}
            <div className="flex gap-2 pt-4">
              <Button
                type="submit"
                disabled={createPost.isPending || updatePost.isPending}
              >
                {createPost.isPending || updatePost.isPending
                  ? '저장 중...'
                  : isEditMode
                  ? '수정'
                  : '작성'}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate(-1)}
              >
                취소
              </Button>
            </div>

            {(createPost.isError || updatePost.isError) && (
              <div className="text-red-600 text-sm">
                {createPost.error?.message || updatePost.error?.message || '오류가 발생했습니다.'}
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
